const { Reserva } = require('../../bbdd/models');  // Ajusta la ruta a tus modelos

describe('Pruebas sobre el modelo de Reserva', () => {
  test('debería crear una reserva correctamente', async () => {
    const reserva = await Reserva.create({
      fecha: '2025-02-15',
      vehiculoId: 4,
      usuarioId: 1
    });

    expect(reserva).toHaveProperty('id');
  });
});
