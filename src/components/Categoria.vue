<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-card bg-variant="secondary">
          <b-card-header>{{ headerProduto }}</b-card-header>
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
              id="input-group-1"
              label-for="input-1"
              description="Campo para cadastro de uma Categoria."
            >
              <b-form-input
                id="input-1"
                v-model="categoria.nome"
                type="text"
                required
                placeholder="Digite o nome da Categoria"
              ></b-form-input>
            </b-form-group>
            <b-button type="text" variant="info" @click="salvarCategoria()">Cadastrar</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
      <b-table show-empty
               stacked="md"
               :items="todasCategorias"
               :fields="fields"
               :current-page="currentPage"
               :per-page="perPage"
               :filter="filter"
               :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               :sort-direction="sortDirection"
               @filtered="onFiltered"
      >

        <template slot="actions" slot-scope="row">
          <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-button size="sm" variant="primary" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
            Cadastrar Produto
          </b-button>
          <b-button size="sm" variant="info" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
            Atualizar
          </b-button>
          <b-button size="sm" variant="danger" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
            Excluir
          </b-button>

        </template>

      </b-table>
  </b-container>
</template>

<script>

  const items = [
    {id: 40, nome:'Dickerson', produtoCadastrado: 'Não'},
    {id: 21, nome:'Shaw', produtoCadastrado: 'Não'}

  ];

  export default {
    name: "categoria",
    data() {
      return {
        msgErro: '',
        categoria: {
          nome: ''
        },
        todasCategorias:[],
        items: items,
        headerProduto: '',
        fields: [
          {key: 'id', label: 'id', variant: 'primary'},
          {key: 'nome', label: 'nome', variant: 'secondary'},
          {key: 'produtoCadastrado', label: 'Produtos Cadastrados', variant: 'primary'},
          {key: 'actions', label: 'Ações',  variant: 'secondary'}
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: items.length,
        pageOptions: [5, 10, 15],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        modalInfo: {title: '', content: ''}
      }
    },
    methods: {

      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.produto.nome = '';
        this.produto.preco = '';
        this.sucesso = false;
      },

      buscarTodasCategorias(evt) {
        evt.preventDefault();
        this.$http.get('http://localhost:9000/categorias').then(response => {
          this.todasCategorias = response.body;
          console.log(this.todasCategorias);
        });
      },

      salvarCategoria(evt) {
        evt.preventDefault();
        this.$http.post('http://localhost:9000/categorias', this.categoria).then(response => {
          this.sucesso = true;
          this.buscarTodasCategorias();
        }, response => {
          this.msgErro = response.body.msg;
          this.erro = true;
        });
      },

      info(item, index, button) {
        this.modalInfo.title = `Row index: ${index}`
        this.modalInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'modalInfo', button)
      },
      resetModal() {
        this.modalInfo.title = ''
        this.modalInfo.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
