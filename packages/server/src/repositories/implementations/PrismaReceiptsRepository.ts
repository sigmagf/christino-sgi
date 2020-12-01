/* eslint-disable @typescript-eslint/camelcase */
import { PrismaClient } from '@prisma/client';

import { Receipt } from '~/entities/Receipts';
import { IPagination } from '~/interface';
import { RepoReceiptsListFilters } from '~/types';
import { withPagination } from '~/utils/withPagination';

import { IReceiptsRepository } from '../IReceiptsRepository';

export class PrismaReceiptsRepository implements IReceiptsRepository {
  private prisma = new PrismaClient();

  async find(vehicleId: string, clientId: string): Promise<Receipt> {
    const data = await this.prisma.receipt.findOne({
      where: { clientId_vehicleId: { vehicleId, clientId } },
      include: {
        client: true,
        vehicle: true,
      },
    });

    return data;
  }

  async list(page = 1, limit = 10, filters?: RepoReceiptsListFilters): Promise<IPagination<Receipt>> {
    const data = await this.prisma.receipt.findMany({
      where: {
        AND: {
          client: {
            name: { contains: filters.client.name },
            document: { contains: filters.client.document },
            group: { contains: filters.client.group },
          },
          vehicle: {
            plate: { contains: filters.vehicle.plate },
            renavam: { contains: filters.vehicle.renavam },
            brandModel: { contains: filters.vehicle.brandModel },
            type: { contains: filters.vehicle.type },
          },
          details: { contains: filters.details },
          status: filters.status,
          issuedOn: filters.issuedOn,
        },
      },
      include: {
        client: true,
        vehicle: true,
      },
    });

    return withPagination(data, page, limit);
  }

  async save(receipt: Omit<Receipt, 'client'|'vehicle'>): Promise<Receipt> {
    const data = await this.prisma.receipt.create({
      data: {
        client: { connect: { id: receipt.clientId } },
        vehicle: { connect: { id: receipt.vehicleId } },
        details: receipt.details,
        status: receipt.status,
        issuedOn: receipt.issuedOn,
      },
      include: {
        client: true,
        vehicle: true,
      },
    });

    return data;
  }

  async update(id: string, { clientId, vehicleId, details, status, issuedOn }: Omit<Receipt, 'id'>): Promise<Receipt> {
    const data = await this.prisma.receipt.update({
      where: { clientId_vehicleId: { clientId, vehicleId } },
      data: {
        client: { connect: { id: clientId } },
        vehicle: { connect: { id: vehicleId } },
        details,
        status,
        issuedOn,
      },
      include: {
        client: true,
        vehicle: true,
      },
    });

    return data;
  }

  async delete(clientId: string, vehicleId: string): Promise<void> {
    await this.prisma.receipt.delete({ where: { clientId_vehicleId: { clientId, vehicleId } } });
  }
}
