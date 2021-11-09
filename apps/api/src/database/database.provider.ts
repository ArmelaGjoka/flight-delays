import { Sequelize } from 'sequelize-typescript';
import { Corona } from '../app/corona/corona.entity';

/**
 * SEQUELIZE variable is stored in a file named
 * 'constants' so it can be easily reused anywhere
 * without being subject to human error.
 */

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        database: './flights.db',
        logging: console.log
      });

      /**
       * Add Models Here
       * ===============
       * You can add the models to
       * Sequelize later on.
       */
      sequelize.addModels([Corona]);

      // await sequelize.sync();
      return sequelize;
    },
  },
];