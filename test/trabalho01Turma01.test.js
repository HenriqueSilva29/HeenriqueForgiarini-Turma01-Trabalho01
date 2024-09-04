const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe('Testes da classe GerenciadorDeTarefas', () => {
    let gerenciador;
    let tarefa1, tarefa2, tarefa3;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
        tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: false, tags: [], data: '2024-09-01', prioridade: 1 };
        tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false, tags: [], data: '2024-09-02', prioridade: 2 };
        tarefa3 = { id: 3, descricao: 'Tarefa 3', concluida: false, tags: [], data: '2024-09-03', prioridade: 1 };
    });

    test('Deve adicionar tarefa corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        expect(gerenciador.listarTarefas()).toContain(tarefa1);
    });

    test('Deve lançar erro ao adicionar tarefa com descrição muito curta', () => {
        const tarefaInvalida = { id: 4, descricao: 'Foo', concluida: false, tags: [], data: '2024-09-04', prioridade: 2 };
        expect(() => {
            gerenciador.adicionarTarefa(tarefaInvalida);
        }).toThrow('Erro ao cadastrar tarefa');
    });

    test('Deve remover tarefa corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.removerTarefa(tarefa1.id);
        expect(gerenciador.listarTarefas()).not.toContain(tarefa1);
    });

    test('Deve buscar tarefa por ID corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        expect(gerenciador.buscarTarefaPorId(tarefa1.id)).toBe(tarefa1);
    });

    test('Deve atualizar tarefa corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.atualizarTarefa(tarefa1.id, { descricao: 'Tarefa Atualizada' });
        expect(gerenciador.buscarTarefaPorId(tarefa1.id).descricao).toBe('Tarefa Atualizada');
    });

    test('Deve listar todas as tarefas corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('Deve contar o número de tarefas corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('Deve marcar tarefa como concluída corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.marcarTarefaComoConcluida(tarefa1.id);
        expect(gerenciador.buscarTarefaPorId(tarefa1.id).concluida).toBe(true);
    });

    test('Deve listar tarefas concluídas corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTarefaComoConcluida(tarefa1.id);
        expect(gerenciador.listarTarefasConcluidas()).toContain(tarefa1);
        expect(gerenciador.listarTarefasConcluidas()).not.toContain(tarefa2);
    });

    test('Deve listar tarefas pendentes corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTarefaComoConcluida(tarefa1.id);
        expect(gerenciador.listarTarefasPendentes()).toContain(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).not.toContain(tarefa1);
    });

    test('Deve remover tarefas concluídas corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTarefaComoConcluida(tarefa1.id);
        gerenciador.removerTarefasConcluidas();
        expect(gerenciador.listarTarefas()).not.toContain(tarefa1);
        expect(gerenciador.listarTarefas()).toContain(tarefa2);
    });

    test('Deve buscar tarefas por descrição corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.buscarTarefaPorDescricao('Tarefa 1')).toContain(tarefa1);
        expect(gerenciador.buscarTarefaPorDescricao('Tarefa 1')).not.toContain(tarefa2);
    });

    test('Deve adicionar tag a tarefa corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTagATarefa(tarefa1.id, 'tag1');
        expect(gerenciador.buscarTarefaPorId(tarefa1.id).tags).toContain('tag1');
    });

    test('Deve remover tag de tarefa corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTagATarefa(tarefa1.id, 'tag1');
        gerenciador.removerTagDaTarefa(tarefa1.id, 'tag1');
        expect(gerenciador.buscarTarefaPorId(tarefa1.id).tags).not.toContain('tag1');
    });

    test('Deve listar tarefas por tag corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTagATarefa(tarefa1.id, 'tag1');
        gerenciador.adicionarTagATarefa(tarefa2.id, 'tag1');
        expect(gerenciador.listarTarefasPorTag('tag1')).toContain(tarefa1);
        expect(gerenciador.listarTarefasPorTag('tag1')).toContain(tarefa2);
    });


    test('Deve atualizar prioridade da tarefa corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.atualizarPrioridade(tarefa1.id, 3);
        expect(gerenciador.buscarTarefaPorId(tarefa1.id).prioridade).toBe(3);
    });

    test('Deve listar tarefas por prioridade corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);
        expect(gerenciador.listarTarefasPorPrioridade(1)).toContain(tarefa1);
        expect(gerenciador.listarTarefasPorPrioridade(1)).toContain(tarefa3);
        expect(gerenciador.listarTarefasPorPrioridade(2)).toContain(tarefa2);
    });

    test('Deve contar tarefas por prioridade corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);
        expect(gerenciador.contarTarefasPorPrioridade(1)).toBe(2);
        expect(gerenciador.contarTarefasPorPrioridade(2)).toBe(1);
    });

    test('Deve marcar todas as tarefas como concluídas corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();
        expect(gerenciador.listarTarefas().every(tarefa => tarefa.concluida)).toBe(true);
    });

    test('Deve reabrir tarefa corretamente', () => {
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.marcarTarefaComoConcluida(tarefa1.id);
        gerenciador.reabrirTarefa(tarefa1.id);
        expect(gerenciador.buscarTarefaPorId(tarefa1.id).concluida).toBe(false);
    });

    test('Deve ordenar tarefas por data corretamente', () => {
            gerenciador.adicionarTarefa(tarefa3);
            gerenciador.adicionarTarefa(tarefa2);
            gerenciador.adicionarTarefa(tarefa1);
    
            gerenciador.ordenarTarefasPorData();
    
            const tarefasOrdenadas = gerenciador.listarTarefas();
            expect(tarefasOrdenadas[0].data).toBe('2024-09-01');
            expect(tarefasOrdenadas[1].data).toBe('2024-09-02');
            expect(tarefasOrdenadas[2].data).toBe('2024-09-03');
        });
    
        test('Deve ordenar tarefas por prioridade corretamente', () => {
            gerenciador.adicionarTarefa(tarefa2);
            gerenciador.adicionarTarefa(tarefa3);
            gerenciador.adicionarTarefa(tarefa1);
    
            gerenciador.ordenarTarefasPorPrioridade();
    
            const tarefasOrdenadas = gerenciador.listarTarefas();
            expect(tarefasOrdenadas[0].prioridade).toBe(1);
            expect(tarefasOrdenadas[1].prioridade).toBe(1);
            expect(tarefasOrdenadas[2].prioridade).toBe(2);
        });

    });