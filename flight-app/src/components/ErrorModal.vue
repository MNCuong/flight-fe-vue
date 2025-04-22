<template>
    <div v-if="show" class="modal" @click="closeModalOutside">
      <div class="modal-content" @click.stop>
        <span class="close-btn" @click="closeModal">&times;</span>
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
        message: ''
      }
    },
    methods: {
      openModal(message) {
        // Mở modal chỉ khi nó chưa được mở
        if (!this.show) {
          this.message = message;
          this.show = true;
        }
      },
      closeModal() {
        this.show = false;
      },
      closeModalOutside(event) {
        // Đảm bảo modal chỉ tắt khi người dùng nhấn vào phần ngoài modal-content
        if (event.target === this.$el) {
          this.closeModal();
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Style cho modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }
  
  .modal-content {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    width: 80%;
    max-width: 500px;
    transform: translateY(-20px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .modal.show .modal-content {
    transform: translateY(0);
    opacity: 1;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 25px;
    font-weight: bold;
    color: #888;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .close-btn:hover {
    color: #d9534f;
  }
  
  p {
    font-size: 16px;
    color: #333;
    text-align: center;
    margin-top: 20px;
  }
  
  .modal .modal-content {
    animation: fadeIn 0.2s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  