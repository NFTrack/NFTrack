
      it('is not initialized', async () => {
        assert.isFalse(await kernelBase.hasInitialized(), 'should not be initialized')
      })

      it('is petrified', async () => {
        assert.isTrue(await kernelBase.isPetrified(), 'should be petrified')
      })

      it('throws on initialization', async () => {
        await assertRevert(kernelBase.initialize(root, root))
      })

      it('should not be usable', async () => {
        await testUnaccessibleFunctionalityWhenUninitialized(kernelBase)
      })
    })

    context('> Directly used', () => {
      let kernel

      beforeEach(async () => {
        kernel = await Kernel.new(false) // allow base to be used directly
      })

      it('is not initialized by default', async () => {
        assert.isFalse(await kernel.hasInitialized(), 'should not be initialized')
      })

      it('is not petrified by default', async () => {
        assert.isFalse(await kernel.isPetrified(), 'should not be petrified')
      })

      it('is initializable and usable', async () => {
        await kernel.initialize(aclBase.address, root)
        assert.isTrue(await kernel.hasInitialized(), 'should be initialized')
        assert.isFalse(await kernel.isPetrified(), 'should not be petrified')

        await testUsability(kernel)
      })
    })
  })

  context('> KernelProxy', () => {
    let kernelBase, kernel

    before(async () => {
      kernelBase = await Kernel.new(true) // petrify immediately
    })

    beforeEach(async () => {
      const kernelProxy = await KernelProxy.new(kernelBase.address)
      kernel = await Kernel.at(kernelProxy.address)
    })

    it('is not initialized by default', async () => {
      assert.isFalse(await kernel.hasInitialized(), 'should not be initialized')
    })

    it('is not petrified by default', async () => {
      assert.isFalse(await kernel.isPetrified(), 'should not be petrified')
    })

    it('should not be usable yet', async () => {
      await testUnaccessibleFunctionalityWhenUninitialized(kernel)
    })

    context('> Initialized', () => {
      let initReceipt, acl
