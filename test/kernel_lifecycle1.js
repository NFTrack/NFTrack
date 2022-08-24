
contract('Kernel lifecycle', ([root, someone]) => {
  let aclBase, appBase
  let DEFAULT_ACL_APP_ID, APP_BASES_NAMESPACE, APP_ADDR_NAMESPACE, APP_MANAGER_ROLE

  const testUnaccessibleFunctionalityWhenUninitialized = async (kernel) => {
    // hasPermission should always return false when uninitialized
    assert.isFalse(await kernel.hasPermission(root, kernel.address, APP_MANAGER_ROLE, EMPTY_BYTES))
    assert.isFalse(await kernel.hasPermission(someone, kernel.address, APP_MANAGER_ROLE, EMPTY_BYTES))

    await assertRevert(kernel.newAppInstance(APP_ID, appBase.address, EMPTY_BYTES, false))
    await assertRevert(kernel.newPinnedAppInstance(APP_ID, appBase.address))
    await assertRevert(kernel.setApp(APP_BASES_NAMESPACE, APP_ID, appBase.address))
    await assertRevert(kernel.setRecoveryVaultAppId(VAULT_ID))
  }

  const testUsability = async (kernel) => {
    // Make sure we haven't already setup the required permission
