const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'project-tatevik3-1',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createCafeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCafe', inputVars);
}
createCafeRef.operationName = 'CreateCafe';
exports.createCafeRef = createCafeRef;

exports.createCafe = function createCafe(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCafeRef(dcInstance, inputVars));
}
;

const updateCafeAddressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCafeAddress', inputVars);
}
updateCafeAddressRef.operationName = 'UpdateCafeAddress';
exports.updateCafeAddressRef = updateCafeAddressRef;

exports.updateCafeAddress = function updateCafeAddress(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateCafeAddressRef(dcInstance, inputVars));
}
;

const listCategoriesByCafeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCategoriesByCafe', inputVars);
}
listCategoriesByCafeRef.operationName = 'ListCategoriesByCafe';
exports.listCategoriesByCafeRef = listCategoriesByCafeRef;

exports.listCategoriesByCafe = function listCategoriesByCafe(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listCategoriesByCafeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const deleteMenuItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMenuItem', inputVars);
}
deleteMenuItemRef.operationName = 'DeleteMenuItem';
exports.deleteMenuItemRef = deleteMenuItemRef;

exports.deleteMenuItem = function deleteMenuItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMenuItemRef(dcInstance, inputVars));
}
;
