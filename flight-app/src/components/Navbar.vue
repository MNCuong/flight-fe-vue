<template>
    <el-header>
        <div class="logo">Admin Dashboard</div>
        <el-dropdown>
            <el-button>
                <i class="el-icon-user"></i> User <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Profile</el-dropdown-item>
                <el-dropdown-item>Logout</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.logo {
    font-size: 24px;
    font-weight: bold;
}
</style>
