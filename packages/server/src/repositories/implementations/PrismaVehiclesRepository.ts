import { PrismaClient } from '@prisma/client';

import { Vehicle } from '~/entities/Vehicle';
import { IPagination } from '~/interface';
import { withPagination } from '~/utils/withPagination';

import { IVehiclesRepository, VehiclesRepositoryListFilters } from '../IVehiclesRepository';

export class PrismaClientsRepository implements IVehiclesRepository {
  private prisma = new PrismaClient();

  async find(id: string, plate: string, renavam: string): Promise<Vehicle> {
    const data = await this.prisma.vehicle.findOne({ where: { id, plate, renavam } });

    return data;
  }

  async list(page = 1, limit = 10, filters?: VehiclesRepositoryListFilters): Promise<IPagination<Vehicle>> {
    const data = await this.prisma.vehicle.findMany({
      where: {
        AND: {
          plate: { contains: filters.plate },
          renavam: { contains: filters.renavam },
          brandModel: { contains: filters.brandModel },
          type: { contains: filters.type },
        },
      },
      orderBy: { plate: 'asc' },
    });

    return withPagination(data, page, limit);
  }

  async save(vehicle: Vehicle): Promise<Vehicle> {
    const data = await this.prisma.vehicle.create({ data: vehicle });

    return data;
  }

  async update(id: string, vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> {
    const data = await this.prisma.vehicle.update({ where: { id }, data: vehicle });

    return data;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vehicle.delete({ where: { id } });
  }
}
