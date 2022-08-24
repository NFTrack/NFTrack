const { hash } = require('eth-ens-namehash')
const { assertEvent, assertAmountOfEvents, assertRevert } = require('@aragon/contract-helpers-test/src/asserts')

const ACL = artifacts.require('ACL')
const Kernel = artifacts.require('Kernel')
const KernelProxy = artifacts.require('KernelProxy')
const AppStub = artifacts.require('AppStub')

const EMPTY_BYTES = '0x'
const APP_ID = hash('stub.aragonpm.test')
const VAULT_ID = hash('vault.aragonpm.test')

contract('Kernel lifecycle', ([root, someone]) => {
  let aclBase, appBase
