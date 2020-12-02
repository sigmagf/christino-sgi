import { PrismaClient } from '@prisma/client';

import { Receipt } from '~/entities/Receipts';
import { IPagination } from '~/interface';
import { RepoReceiptsListFilters, RepoReceiptsSave, RepoReceiptsUpdate } from '~/types';
import { withPagination } from '~/utils/withPagination';

import { IReceiptsRepository } from '../IReceiptsRepository';

export class PrismaReceiptsRepository implements IReceiptsRepository {
  private prisma = new PrismaClient();

  async find(clientId: string, vehicleId: string): Promise<Receipt> {
    const data = await this.prisma.receipt.findUnique({
      where: { clientId_vehicleId: { clientId, vehicleId } },
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

  async save(receipt: RepoReceiptsSave): Promise<Receipt> {
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

  async update(clientId: string, vehicleId: string, receipt: RepoReceiptsUpdate): Promise<Receipt> {
    const data = await this.prisma.receipt.update({
      where: { clientId_vehicleId: { clientId, vehicleId } },
      data: receipt,
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
