import { CreateCafeData, CreateCafeVariables, UpdateCafeAddressData, UpdateCafeAddressVariables, ListCategoriesByCafeData, ListCategoriesByCafeVariables, DeleteMenuItemData, DeleteMenuItemVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateCafe(options?: useDataConnectMutationOptions<CreateCafeData, FirebaseError, CreateCafeVariables>): UseDataConnectMutationResult<CreateCafeData, CreateCafeVariables>;
export function useCreateCafe(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCafeData, FirebaseError, CreateCafeVariables>): UseDataConnectMutationResult<CreateCafeData, CreateCafeVariables>;

export function useUpdateCafeAddress(options?: useDataConnectMutationOptions<UpdateCafeAddressData, FirebaseError, UpdateCafeAddressVariables>): UseDataConnectMutationResult<UpdateCafeAddressData, UpdateCafeAddressVariables>;
export function useUpdateCafeAddress(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCafeAddressData, FirebaseError, UpdateCafeAddressVariables>): UseDataConnectMutationResult<UpdateCafeAddressData, UpdateCafeAddressVariables>;

export function useListCategoriesByCafe(vars: ListCategoriesByCafeVariables, options?: useDataConnectQueryOptions<ListCategoriesByCafeData>): UseDataConnectQueryResult<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;
export function useListCategoriesByCafe(dc: DataConnect, vars: ListCategoriesByCafeVariables, options?: useDataConnectQueryOptions<ListCategoriesByCafeData>): UseDataConnectQueryResult<ListCategoriesByCafeData, ListCategoriesByCafeVariables>;

export function useDeleteMenuItem(options?: useDataConnectMutationOptions<DeleteMenuItemData, FirebaseError, DeleteMenuItemVariables>): UseDataConnectMutationResult<DeleteMenuItemData, DeleteMenuItemVariables>;
export function useDeleteMenuItem(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMenuItemData, FirebaseError, DeleteMenuItemVariables>): UseDataConnectMutationResult<DeleteMenuItemData, DeleteMenuItemVariables>;
