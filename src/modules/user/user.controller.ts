import { Body, Controller, Post } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'
import CreateUserDto from './dto/create-user.dto'

@Controller('user')
export class UserController {
	constructor(
		@InjectModel(User)
		private userModel: typeof User,
	) {}

	@Post()
	async create(@Body() body: CreateUserDto) {
		// Пустой объект: нет ошибки
		await this.userModel.create({})

		// Объект с несуществующими полями: нет ошибки
		await this.userModel.create({ someField: 0 })

		// Объект с правильными полями: нет ошибки
		await this.userModel.create({ name: 'Andrew', isActive: true })

		// При передаче DTO ошибка
		// TS2345: Argument of type 'CreateUserDto' is not assignable to parameter of type 'Optional<any, string>'.
		// Type 'CreateUserDto' is not assignable to type 'Omit<any, string>'.
		// Index signature for type 'number' is missing in type 'CreateUserDto'.
		await this.userModel.create(body)
		// В body приходит нормальный объект, который без проблем записывается в таблицу.
	}
}
