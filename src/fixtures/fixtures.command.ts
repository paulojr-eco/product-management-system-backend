import { Console, Command } from 'nestjs-console';
import { DataSource } from 'typeorm';
import { imageData } from './images.data';

@Console()
export class FixturesCommand {
  constructor(private dataSource: DataSource) {}

  @Command({
    command: 'fixtures',
    description: 'Seed data in database',
  })
  async command() {
    await this.clearTables();
    for (const fixture of fixtures as any) {
      await this.createInDatabase(fixture.model, fixture.fields);
    }
    console.log('Data generated');
  }

  async clearTables() {
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize();
  }

  async createInDatabase(model: any, data: any) {
    const repository = this.getRepository(model);
    const obj = repository.create(data);
    await repository.save(obj);
  }

  getRepository(model: any) {
    return this.dataSource.getRepository(model);
  }
}

const fixtures = [
  {
    model: 'produto',
    fields: {
      id: 1,
      descricao: 'Litro de Leite',
      custo: 3.999,
      imagem: imageData.litroDeLeite,
    },
  },
  {
    model: 'produto',
    fields: {
      id: 2,
      descricao: 'Galão de Água',
      custo: 10.899,
      imagem: imageData.galaoDeAgua,
    },
  },
  {
    model: 'produto',
    fields: {
      id: 3,
      descricao: 'Pacote de Macarrão',
      custo: 7.645,
      imagem: imageData.pacoteDeMacarrao,
    },
  },
  {
    model: 'loja',
    fields: {
      id: 1,
      descricao: 'Supermercado Exemplo',
    },
  },
  {
    model: 'loja',
    fields: {
      id: 2,
      descricao: 'Atacadão Teste',
    },
  },
  {
    model: 'loja',
    fields: {
      id: 3,
      descricao: 'Mercadinho de Teste',
    },
  },
  {
    model: 'loja',
    fields: {
      id: 4,
      descricao: 'Mercadão Exemplo',
    },
  },
  {
    model: 'produtoloja',
    fields: {
      id: 1,
      idProduto: 1,
      idLoja: 1,
      precoVenda: 4.95,
    },
  },
  {
    model: 'produtoloja',
    fields: {
      id: 2,
      idProduto: 1,
      idLoja: 2,
      precoVenda: 5.25,
    },
  },
  {
    model: 'produtoloja',
    fields: {
      id: 3,
      idProduto: 2,
      idLoja: 3,
      precoVenda: 12.799,
    },
  },
  {
    model: 'produtoloja',
    fields: {
      id: 4,
      idProduto: 3,
      idLoja: 4,
      precoVenda: 9.999,
    },
  },
];
