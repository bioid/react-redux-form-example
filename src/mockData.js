let people = [...new Array(5)].map((_, i) => ({
  firstName: 'first'+i,
  lastName: 'last'+i,
  id: i,
  email: i+'@test.com'
}));

export { people };