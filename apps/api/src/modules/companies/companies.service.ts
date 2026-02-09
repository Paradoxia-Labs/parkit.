import { prisma } from "../../shared/prisma";
import { CreateCompanyDTO, UpdateCompanyDTO } from "./companies.types";

export class CompaniesService {
  static async create(data: CreateCompanyDTO) {
    return prisma.company.create({
      data,
    });
  }

  static async getById(id: string) {
    return prisma.company.findUnique({
      where: { id },
    });
  }

  static async update(id: string, data: UpdateCompanyDTO) {
    return prisma.company.update({
      where: { id },
      data,
    });
  }

  static async list() {
    return prisma.company.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}
