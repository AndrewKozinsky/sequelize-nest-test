import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModule } from '../user/user.module'
import { User } from '../user/user.model'

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: '0.0.0.0',
			port: 4001,
			username: 'postgres',
			password: 'kxPQor_cf23GR',
			database: 'sequelize-test',
			models: [User],

			autoLoadModels: true,
			synchronize: true,
			sync: { alter: true, force: true }
		}),
		UserModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
}
