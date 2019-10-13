import DataTable from 'stimulus-datatables'

export default class extends DataTable {
  initialize() {
    // Ignore ghost events.
    if (!this.isBooting()) return

    // Default settings here can be overridded by component configurations.
    this.config = { pagingType: 'full_numbers', debug: true }

    // Call the super method which gets the component configuration.
    super.initialize()

    // This sets the final config values.
    this.config.dom = 'lfriptrip'
  }

  connect() {
    // Ignore ghost events.
    if (!this.isBooting()) return

    // You can alter the config here before the connect.

    // Call the super method to start up DataTables.
    super.connect()

    // Any post connect actions here.
  }

  teardown() {
    this.log('finished', { controller: this })

    // Call the super method to destroy the DataTable instance.
    super.teardown()
  }
}
