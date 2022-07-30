export default function getRecipient(users, currentUser) {
  return users?.filter((user) => user !== currentUser.email)[0];
}
