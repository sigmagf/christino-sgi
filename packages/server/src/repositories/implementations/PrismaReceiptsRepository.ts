import { PrismaClient } from '@prisma/client';

import { Receipt } from '~/entities/Receipts';
import { IPagination } from '~/interface';
import { withPagination } from '~/utils/withPagination';

import { IReceiptsRepository, ReceiptsRepositoryListFilters } from '../IReceiptsRepository';

export class PrismaVehiclesRepository implements IReceiptsRepository {
  private prisma = new PrismaClient();

  async find(id: string): Promise<Receipt> {
    const data = await this.prisma.receipt.findOne({
      where: { id },
      include: {
        client: true,
        vehicle: true,
      },
    });

    if(!data) {
      return null;
    }

    return data;
  }

  async list(page = 1, limit = 10, filters?: ReceiptsRepositoryListFilters): Promise<IPagination<Receipt>> {
    const data = await this.prisma.receipt.findMany({
      where: {
        AND: {
          clientId: { contains: filters.clientId },
          client: {
            name: { contains: filters.client.name },
            document: { contains: filters.client.document },
            group: { contains: filters.client.group },
          },
          vehicleId: { contains: filters.vehicleId },
          vehicle: {
            plate: { contains: filters.vehicle.plate },
            renavam: { contains: filters.vehicle.renavam },
            brandModel: { contains: filters.vehicle.brandModel },
            type: { contains: filters.vehicle.type },
          },
          details: { contains: filters.details },
          status: { contains: filters.status },
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

  async save({ id, clientId, vehicleId, details, status, issuedOn }: Receipt): Promise<Receipt> {
    const data = await this.prisma.receipt.create({
      data: {
        id,
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

  async update(id: string, { clientId, vehicleId, details, status, issuedOn }: Omit<Receipt, 'id'>): Promise<Receipt> {
    const data = await this.prisma.receipt.update({
      where: { id },
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

  async delete(id: string): Promise<void> {
    await this.prisma.receipt.delete({ where: { id } });
  }
}
