<template>
    <div class="notification" :class="`alert-${type}`" v-if="visible">
      <strong>{{ title }}</strong> - {{ message }}
      <button class="close-btn" @click="closeNotification">✖</button>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      default: 'Notification'
    },
    message: {
      type: String,
      default: 'This is a notification message'
    },
    type: {
      type: String,
      default: 'info' // Could be 'success', 'warning', 'danger', 'primary', etc.
    },
    duration: {
      type: Number,
      default: 5000 // Default duration of 5 seconds
    }
  }); 

  const visible = ref(true);
  
  // Automatically close notification after the duration
  onMounted(() => {
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  });
  
  // Close notification manually
  const closeNotification = () => {
    visible.value = false;
  };
  </script>
  
  <style scoped>
  .notification {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 15px;
    margin-bottom: 10px;
    color: white;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 300px;
    max-width: 400px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: opacity 0.5s ease, transform 0.5s ease;
    opacity: 1;
    transform: translateY(0);
  }
  
  .notification .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .notification.alert-info {
    background-color: #17a2b8;
  }
  
  .notification.alert-success {
    background-color: #28a745;
  }
  
  .notification.alert-warning {
    background-color: #ffc107;
  }
  
  .notification.alert-danger {
    background-color: #dc3545;
  }
  
  .notification.alert-primary {
    background-color: #007bff;
  }
  
  .notification.alert-rose {
    background-color: #e83e8c;
  }
  
  .notification-leave-active {
    opacity: 0;
    transform: translateY(-20px);
  }
  </style>
  