import { PrismaClient } from '@prisma/client';

import { Crv } from '~/entities/CRV';
import { RepoCRVsListFilters, RepoCRVsSave, RepoCRVsUpdate } from '~/types';
import { sortCRVs } from '~/utils/sortCRVs';

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

    this.prisma.$disconnect();
    return data;
  }

  async list(filters?: RepoCRVsListFilters): Promise<Crv[]> {
    console.log(filters);
    const data = await this.prisma.crv.findMany({
      include: {
        client: true,
        vehicle: true,
      },
    });

    this.prisma.$disconnect();
    return sortCRVs(data);
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

    this.prisma.$disconnect();
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

    this.prisma.$disconnect();
    return data;
  }

  async delete(clientId: string, vehicleId: string): Promise<void> {
    await this.prisma.crv.delete({ where: { clientId_vehicleId: { clientId, vehicleId } } });
    this.prisma.$disconnect();
  }
}
