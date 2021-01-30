import { useLocalStorage } from '~/hooks';

export function validPermission(permission: 'segu_permission'|'desp_permission', level = 1) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const storage = useLocalStorage();
  const perm = storage.getItem(permission);

  if(!perm) {
    return false;
  }

  return perm >= level;
}
