<template>
    <div class="pagination mt-4 text-center">
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <!-- Previous Button with Arrow Icon (No Background) -->
          <li class="page-item" :class="{ disabled: page === 0 }">
            <button class="page-link" @click="prevPage" :disabled="page === 0">
              <i class="bi bi-chevron-left"></i> <!-- Bootstrap icon for left arrow -->
            </button>
          </li>
  
          <!-- Pagination Numbers with Round Button and Space Between Them -->
          <li v-for="n in totalPages" :key="n" class="page-item" :class="{ active: page === n - 1 }">
            <button class="page-link rounded-circle mx-2" @click="goToPage(n - 1)">
              {{ n }}
            </button>
          </li>
  
          <!-- Next Button with Arrow Icon (No Background) -->
          <li class="page-item" :class="{ disabled: page >= totalPages - 1 }">
            <button class="page-link" @click="nextPage" :disabled="page >= totalPages - 1">
              <i class="bi bi-chevron-right"></i> <!-- Bootstrap icon for right arrow -->
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      page: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    methods: {
      goToPage(pageNum) {
        this.$emit('update:page', pageNum);
      },
      prevPage() {
        if (this.page > 0) {
          this.$emit('update:page', this.page - 1);
        }
      },
      nextPage() {
        if (this.page < this.totalPages - 1) {
          this.$emit('update:page', this.page + 1);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .page-item {
    margin: 0 5px;
  }
  
  .page-link {
    background: transparent;
    border: 1px solid #007bff;
    color: #007bff;
  }
  
  .page-item .page-link:hover {
    background-color: #007bff;
    color: white;
  }
  
  .page-link.rounded-circle {
    width: 35px;
    height: 35px;
    text-align: center;
    padding: 0;
    line-height: 35px;
    font-weight: bold;
  }
  
  .page-item .page-link i {
    font-size: 18px;
  }
  
  .page-item .page-link.rounded-circle.mx-2 {
    margin-left: 5px;
    margin-right: 5px;
  }
  
  .page-item.disabled .page-link {
    color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  