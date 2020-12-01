import { PrismaClient } from '@prisma/client';

import { Vehicle } from '~/entities/Vehicle';
import { IPagination } from '~/interface';
import { RepoVehicleFindOrCreate, RepoVehicleListFilters } from '~/types';
import { withPagination } from '~/utils/withPagination';

import { IVehiclesRepository } from '../IVehiclesRepository';

export class PrismaVehiclesRepository implements IVehiclesRepository {
  private prisma = new PrismaClient();

  async find(id: string, plate: string, renavam: string): Promise<Vehicle> {
    const data = await this.prisma.vehicle.findOne({ where: { id, plate, renavam } });

    return data;
  }

  async findOrCreate(vehicle: RepoVehicleFindOrCreate): Promise<Vehicle> {
    const dbVehiclePlate = await this.prisma.vehicle.findOne({ where: { plate: vehicle.plate } });
    const dbVehicleRenavam = await this.prisma.vehicle.findOne({ where: { renavam: vehicle.renavam } });

    if(!dbVehiclePlate && !dbVehicleRenavam) {
      const newVehicle = await this.prisma.vehicle.create({ data: vehicle });

      return newVehicle;
    }

    if(dbVehiclePlate && dbVehicleRenavam && dbVehicleRenavam.id !== dbVehiclePlate.id) {
      throw new Error('Two diferent entries founded in database.');
    }

    return dbVehiclePlate;
  }

  async list(page = 1, limit = 10, filters?: RepoVehicleListFilters): Promise<IPagination<Vehicle>> {
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
