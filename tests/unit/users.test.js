const usersRepository = require("../../app/repositories/UsersRepository");

test('Listando usuários', async () => {
  const users = await usersRepository.list();

  expect(users).not.toBeNull();
  expect(users.length).toBeGreaterThan(0);
});

test('Salvar usuário com sucesso', async () => {
  const user = await usersRepository.save({
    name: "João Silva",
    email: "joao.silva@example.com",
    password: "senha123"
  });

  expect(user.id).not.toBeNull();
  expect(user.name).toBe("João Silva");
  expect(user.email).toBe("joao.silva@example.com");
});

test('Encontrando Usuário pelo ID', async () => {
  const user_data = {
    name: "Maria Souza",
    email: "maria.souza@example.com",
    password: "senha456"
  };

  // Cria um Usuário no banco
  const new_user = await usersRepository.save(user_data);

  const user = await usersRepository.find(new_user.id);

  expect(user.id).not.toBeNull();
  expect(user.name).not.toBeNull();
  expect(user.name).toBe(user_data.name);
  expect(user.email).toBe(user_data.email);
});

test('Atualizando um Usuário já existente', async () => {
  const user_data = {
    name: "Carlos Pereira",
    email: "carlos.pereira@example.com",
    password: "senha789"
  };

  // Cria um Usuário no banco
  const new_user = await usersRepository.save(user_data);

  // Busca o Usuário e altera
  const user = await usersRepository.find(new_user.id);
  user.name = "Carlos Pereira Alterado";
  user.email = "carlos.pereira.alterado@example.com";
  await usersRepository.update(user.id, user);

  // Busca o Usuário novamente e assegura que a alteração foi gravada no banco
  const updated_user = await usersRepository.find(user.id);

  expect(updated_user.name).toBe(user.name);
  expect(updated_user.email).toBe(user.email);
});

test('Removendo Usuário do banco de dados', async () => {
  // Cria um Usuário no banco
  const new_user = await usersRepository.save({
    name: "Ana Clara",
    email: "ana.clara@example.com",
    password: "senha101112"
  });

  // Remove o Usuário do banco
  await usersRepository.remove(new_user.id);

  // Assegura que o Usuário foi removido
  const user = await usersRepository.find(new_user.id);

  expect(user).toBeNull();
});

