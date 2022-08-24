  }

  // Initial setup
  before(async () => {
    aclBase = await ACL.new()
    appBase = await AppStub.new()

    // Setup constants
    const kernel = await Kernel.new(true)
    DEFAULT_ACL_APP_ID = await kernel.DEFAULT_ACL_APP_ID()
    APP_BASES_NAMESPACE = await kernel.APP_BASES_NAMESPACE()
    APP_ADDR_NAMESPACE = await kernel.APP_ADDR_NAMESPACE()
    APP_MANAGER_ROLE = await kernel.APP_MANAGER_ROLE()
  })

  context('> Kernel base', () => {
    context('> Petrified', () => {
      let kernelBase
