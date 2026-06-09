import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Cafe_Key {
  id: UUIDString;
  __typename?: 'Cafe_Key';
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateCafeData {
  cafe_insert: Cafe_Key;
}

export interface CreateCafeVariables {
  name: string;
  ownerId: string;
}

export interface DeleteMenuItemData {
  menuItem_delete?: MenuItem_Key | null;
}

export interface DeleteMenuItemVariables {
  itemId: UUIDString;
}

export interface ListCategoriesByCafeData {
  categories: ({
    name: string;
    displayOrder: number;
  })[];
}

export interface ListCategoriesByCafeVariables {
  cafeId: UUIDString;
}

export interface MenuAssignment_Key {
  id: UUIDString;
  __typename?: 'MenuAssignment_Key';
}

export interface MenuItem_Key {
  id: UUIDString;
  __typename?: 'MenuItem_Key';
}

export interface Menu_Key {
  id: UUIDString;
  __typename?: 'Menu_Key';
}

export interface UpdateCafeAddressData {
  cafe_update?: Cafe_Key | null;
}

export interface UpdateCafeAddressVariables {
  id: UUIDString;
  newAddress: string;
}

interface CreateCafeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCafeVariables): MutationRef<CreateCafeData, CreateCafeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCafeVariables): MutationRef<CreateCafeData, CreateCafeVariables>;
  operationName: string;
}
export const createCafeRef: CreateCafeRef;

export function createCafe(vars: CreateCafeVariables): MutationPromise<CreateCafeData, CreateCafeVariables>;
export function createCafe(dc: DataConnect, vars: CreateCafeVariables): MutationPromise<CreateCafeData, CreateCafeVariables>;

interface UpdateCafeAddressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCafeAddressVariables): MutationRef<UpdateCafeAddressData, UpdateCafeAddressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCafeAddressVariables): MutationRef<UpdateCafeAddressData, UpdateCafeAddressVariables>;
  operationName: string;
}
export const updateCafeAddressRef: UpdateCafeAddressRef;

export function updateCafeAddress(vars: UpdateCafeAddressVariables): MutationPromise<UpdateCafeAddressData, UpdateCafeAddressVariables>;
export function updateCafeAddress(dc: DataConnect, vars: UpdateCafeAddressVariables): MutationPromise<UpdateCafeAddressData, UpdateCafeAddressVariables>;

interface ListCategoriesByCafeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCategoriesByCafeVariables): QueryRef<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCategoriesByCafeVariables): QueryRef<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;
  operationName: string;
}
export const listCategoriesByCafeRef: ListCategoriesByCafeRef;

export function listCategoriesByCafe(vars: ListCategoriesByCafeVariables, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;
export function listCategoriesByCafe(dc: DataConnect, vars: ListCategoriesByCafeVariables, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;

interface DeleteMenuItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMenuItemVariables): MutationRef<DeleteMenuItemData, DeleteMenuItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMenuItemVariables): MutationRef<DeleteMenuItemData, DeleteMenuItemVariables>;
  operationName: string;
}
export const deleteMenuItemRef: DeleteMenuItemRef;

export function deleteMenuItem(vars: DeleteMenuItemVariables): MutationPromise<DeleteMenuItemData, DeleteMenuItemVariables>;
export function deleteMenuItem(dc: DataConnect, vars: DeleteMenuItemVariables): MutationPromise<DeleteMenuItemData, DeleteMenuItemVariables>;

