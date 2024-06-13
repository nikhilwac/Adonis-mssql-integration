import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public up() {
    this.schema.alterTable('users', (table) => {
      table.string('first_name')
      table.string('last_name')
    })
  }
}

