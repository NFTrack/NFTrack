   assertEvent(initReceipt, 'SetApp', { namespace: APP_BASES_NAMESPACE, appId: DEFAULT_ACL_APP_ID, app: aclBase.address }, 0)
        assertEvent(initReceipt, 'SetApp', { namespace: APP_ADDR_NAMESPACE, appId: DEFAULT_ACL_APP_ID, app: acl.address }, 1)
      })

      it('is now initialized', async () => {
        assert.isTrue(await kernel.hasInitialized(), 'should be initialized')
      })

      it('is still not petrified', async () => {
        assert.isFalse(await kernel.isPetrified(), 'should not be petrified')
      })

      it('has correct initialization block', async () => {
        assert.equal(await kernel.getInitializationBlock(), await web3.eth.getBlockNumber(), 'initialization block should be correct')
      })

      it('throws on reinitialization', async () => {
        await assertRevert(kernel.initialize(root, root))
      })

      it('should now be usable', async () => {
        await testUsability(kernel)
      })
    })
  })
})
