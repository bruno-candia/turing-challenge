export function getName(name: { title: string; first: string; last: string }) {
  const { title, first, last } = name;
  return `${title} ${first} ${last}`;
}
