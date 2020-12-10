import { PrismaClient } from '@prisma/client';

import { Crv } from '~/entities/CRV';
import { IPagination } from '~/interface';
import { RepoCRVsListFilters, RepoCRVsSave, RepoCRVsUpdate } from '~/types';
import { withPagination } from '~/utils/withPagination';

import { ICRVsRepository } from '../ICRVsRepository';

export class PrismaCRVsRepository implements ICRVsRepository {
  private prisma = new PrismaClient();

  async find(clientId: string, vehicleId: string): Promise<Crv> {
    const data = await this.prisma.crv.findUnique({
      where: { clientId_vehicleId: { clientId, vehicleId } },
      include: {
        client: true,
        vehicle: true,
      },
    });

    return data;
  }

  async list(page = 1, limit = 10, filters?: RepoCRVsListFilters): Promise<IPagination<Crv>> {
    const data = await this.prisma.crv.findMany({
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

  async save(receipt: RepoCRVsSave): Promise<Crv> {
    const data = await this.prisma.crv.create({
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

  async update(clientId: string, vehicleId: string, receipt: RepoCRVsUpdate): Promise<Crv> {
    const data = await this.prisma.crv.update({
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
    await this.prisma.crv.delete({ where: { clientId_vehicleId: { clientId, vehicleId } } });
  }
}
