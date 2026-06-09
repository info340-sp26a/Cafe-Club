# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListCategoriesByCafe*](#listcategoriesbycafe)
- [**Mutations**](#mutations)
  - [*CreateCafe*](#createcafe)
  - [*UpdateCafeAddress*](#updatecafeaddress)
  - [*DeleteMenuItem*](#deletemenuitem)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListCategoriesByCafe
You can execute the `ListCategoriesByCafe` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCategoriesByCafe(vars: ListCategoriesByCafeVariables, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;

interface ListCategoriesByCafeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCategoriesByCafeVariables): QueryRef<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;
}
export const listCategoriesByCafeRef: ListCategoriesByCafeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCategoriesByCafe(dc: DataConnect, vars: ListCategoriesByCafeVariables, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;

interface ListCategoriesByCafeRef {
  ...
  (dc: DataConnect, vars: ListCategoriesByCafeVariables): QueryRef<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;
}
export const listCategoriesByCafeRef: ListCategoriesByCafeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCategoriesByCafeRef:
```typescript
const name = listCategoriesByCafeRef.operationName;
console.log(name);
```

### Variables
The `ListCategoriesByCafe` query requires an argument of type `ListCategoriesByCafeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCategoriesByCafeVariables {
  cafeId: UUIDString;
}
```
### Return Type
Recall that executing the `ListCategoriesByCafe` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCategoriesByCafeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCategoriesByCafeData {
  categories: ({
    name: string;
    displayOrder: number;
  })[];
}
```
### Using `ListCategoriesByCafe`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCategoriesByCafe, ListCategoriesByCafeVariables } from '@dataconnect/generated';

// The `ListCategoriesByCafe` query requires an argument of type `ListCategoriesByCafeVariables`:
const listCategoriesByCafeVars: ListCategoriesByCafeVariables = {
  cafeId: ..., 
};

// Call the `listCategoriesByCafe()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCategoriesByCafe(listCategoriesByCafeVars);
// Variables can be defined inline as well.
const { data } = await listCategoriesByCafe({ cafeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCategoriesByCafe(dataConnect, listCategoriesByCafeVars);

console.log(data.categories);

// Or, you can use the `Promise` API.
listCategoriesByCafe(listCategoriesByCafeVars).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

### Using `ListCategoriesByCafe`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCategoriesByCafeRef, ListCategoriesByCafeVariables } from '@dataconnect/generated';

// The `ListCategoriesByCafe` query requires an argument of type `ListCategoriesByCafeVariables`:
const listCategoriesByCafeVars: ListCategoriesByCafeVariables = {
  cafeId: ..., 
};

// Call the `listCategoriesByCafeRef()` function to get a reference to the query.
const ref = listCategoriesByCafeRef(listCategoriesByCafeVars);
// Variables can be defined inline as well.
const ref = listCategoriesByCafeRef({ cafeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCategoriesByCafeRef(dataConnect, listCategoriesByCafeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateCafe
You can execute the `CreateCafe` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCafe(vars: CreateCafeVariables): MutationPromise<CreateCafeData, CreateCafeVariables>;

interface CreateCafeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCafeVariables): MutationRef<CreateCafeData, CreateCafeVariables>;
}
export const createCafeRef: CreateCafeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCafe(dc: DataConnect, vars: CreateCafeVariables): MutationPromise<CreateCafeData, CreateCafeVariables>;

interface CreateCafeRef {
  ...
  (dc: DataConnect, vars: CreateCafeVariables): MutationRef<CreateCafeData, CreateCafeVariables>;
}
export const createCafeRef: CreateCafeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCafeRef:
```typescript
const name = createCafeRef.operationName;
console.log(name);
```

### Variables
The `CreateCafe` mutation requires an argument of type `CreateCafeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCafeVariables {
  name: string;
  ownerId: string;
}
```
### Return Type
Recall that executing the `CreateCafe` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCafeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCafeData {
  cafe_insert: Cafe_Key;
}
```
### Using `CreateCafe`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCafe, CreateCafeVariables } from '@dataconnect/generated';

// The `CreateCafe` mutation requires an argument of type `CreateCafeVariables`:
const createCafeVars: CreateCafeVariables = {
  name: ..., 
  ownerId: ..., 
};

// Call the `createCafe()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCafe(createCafeVars);
// Variables can be defined inline as well.
const { data } = await createCafe({ name: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCafe(dataConnect, createCafeVars);

console.log(data.cafe_insert);

// Or, you can use the `Promise` API.
createCafe(createCafeVars).then((response) => {
  const data = response.data;
  console.log(data.cafe_insert);
});
```

### Using `CreateCafe`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCafeRef, CreateCafeVariables } from '@dataconnect/generated';

// The `CreateCafe` mutation requires an argument of type `CreateCafeVariables`:
const createCafeVars: CreateCafeVariables = {
  name: ..., 
  ownerId: ..., 
};

// Call the `createCafeRef()` function to get a reference to the mutation.
const ref = createCafeRef(createCafeVars);
// Variables can be defined inline as well.
const ref = createCafeRef({ name: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCafeRef(dataConnect, createCafeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cafe_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cafe_insert);
});
```

## UpdateCafeAddress
You can execute the `UpdateCafeAddress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCafeAddress(vars: UpdateCafeAddressVariables): MutationPromise<UpdateCafeAddressData, UpdateCafeAddressVariables>;

interface UpdateCafeAddressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCafeAddressVariables): MutationRef<UpdateCafeAddressData, UpdateCafeAddressVariables>;
}
export const updateCafeAddressRef: UpdateCafeAddressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCafeAddress(dc: DataConnect, vars: UpdateCafeAddressVariables): MutationPromise<UpdateCafeAddressData, UpdateCafeAddressVariables>;

interface UpdateCafeAddressRef {
  ...
  (dc: DataConnect, vars: UpdateCafeAddressVariables): MutationRef<UpdateCafeAddressData, UpdateCafeAddressVariables>;
}
export const updateCafeAddressRef: UpdateCafeAddressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCafeAddressRef:
```typescript
const name = updateCafeAddressRef.operationName;
console.log(name);
```

### Variables
The `UpdateCafeAddress` mutation requires an argument of type `UpdateCafeAddressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCafeAddressVariables {
  id: UUIDString;
  newAddress: string;
}
```
### Return Type
Recall that executing the `UpdateCafeAddress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCafeAddressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCafeAddressData {
  cafe_update?: Cafe_Key | null;
}
```
### Using `UpdateCafeAddress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCafeAddress, UpdateCafeAddressVariables } from '@dataconnect/generated';

// The `UpdateCafeAddress` mutation requires an argument of type `UpdateCafeAddressVariables`:
const updateCafeAddressVars: UpdateCafeAddressVariables = {
  id: ..., 
  newAddress: ..., 
};

// Call the `updateCafeAddress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCafeAddress(updateCafeAddressVars);
// Variables can be defined inline as well.
const { data } = await updateCafeAddress({ id: ..., newAddress: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCafeAddress(dataConnect, updateCafeAddressVars);

console.log(data.cafe_update);

// Or, you can use the `Promise` API.
updateCafeAddress(updateCafeAddressVars).then((response) => {
  const data = response.data;
  console.log(data.cafe_update);
});
```

### Using `UpdateCafeAddress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCafeAddressRef, UpdateCafeAddressVariables } from '@dataconnect/generated';

// The `UpdateCafeAddress` mutation requires an argument of type `UpdateCafeAddressVariables`:
const updateCafeAddressVars: UpdateCafeAddressVariables = {
  id: ..., 
  newAddress: ..., 
};

// Call the `updateCafeAddressRef()` function to get a reference to the mutation.
const ref = updateCafeAddressRef(updateCafeAddressVars);
// Variables can be defined inline as well.
const ref = updateCafeAddressRef({ id: ..., newAddress: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCafeAddressRef(dataConnect, updateCafeAddressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cafe_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cafe_update);
});
```

## DeleteMenuItem
You can execute the `DeleteMenuItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMenuItem(vars: DeleteMenuItemVariables): MutationPromise<DeleteMenuItemData, DeleteMenuItemVariables>;

interface DeleteMenuItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMenuItemVariables): MutationRef<DeleteMenuItemData, DeleteMenuItemVariables>;
}
export const deleteMenuItemRef: DeleteMenuItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMenuItem(dc: DataConnect, vars: DeleteMenuItemVariables): MutationPromise<DeleteMenuItemData, DeleteMenuItemVariables>;

interface DeleteMenuItemRef {
  ...
  (dc: DataConnect, vars: DeleteMenuItemVariables): MutationRef<DeleteMenuItemData, DeleteMenuItemVariables>;
}
export const deleteMenuItemRef: DeleteMenuItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMenuItemRef:
```typescript
const name = deleteMenuItemRef.operationName;
console.log(name);
```

### Variables
The `DeleteMenuItem` mutation requires an argument of type `DeleteMenuItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMenuItemVariables {
  itemId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMenuItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMenuItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMenuItemData {
  menuItem_delete?: MenuItem_Key | null;
}
```
### Using `DeleteMenuItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMenuItem, DeleteMenuItemVariables } from '@dataconnect/generated';

// The `DeleteMenuItem` mutation requires an argument of type `DeleteMenuItemVariables`:
const deleteMenuItemVars: DeleteMenuItemVariables = {
  itemId: ..., 
};

// Call the `deleteMenuItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMenuItem(deleteMenuItemVars);
// Variables can be defined inline as well.
const { data } = await deleteMenuItem({ itemId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMenuItem(dataConnect, deleteMenuItemVars);

console.log(data.menuItem_delete);

// Or, you can use the `Promise` API.
deleteMenuItem(deleteMenuItemVars).then((response) => {
  const data = response.data;
  console.log(data.menuItem_delete);
});
```

### Using `DeleteMenuItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMenuItemRef, DeleteMenuItemVariables } from '@dataconnect/generated';

// The `DeleteMenuItem` mutation requires an argument of type `DeleteMenuItemVariables`:
const deleteMenuItemVars: DeleteMenuItemVariables = {
  itemId: ..., 
};

// Call the `deleteMenuItemRef()` function to get a reference to the mutation.
const ref = deleteMenuItemRef(deleteMenuItemVars);
// Variables can be defined inline as well.
const ref = deleteMenuItemRef({ itemId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMenuItemRef(dataConnect, deleteMenuItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.menuItem_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.menuItem_delete);
});
```

