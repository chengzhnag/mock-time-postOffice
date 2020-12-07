<template>
<div id="app">
    <div class="box">
        <div class="header">
            <el-menu router :default-active="activeIndex" class="el-menu-demo menu-box" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item class="menu-item" index="/">写一封信</el-menu-item>
                <el-menu-item class="menu-item" index="/public">公开信</el-menu-item>
                <el-menu-item class="menu-item" index="/letters">信件列表</el-menu-item>
                <el-menu-item class="menu-item" index="/extract">手动提取</el-menu-item>
                <el-menu-item class="menu-item" index="/about">关于</el-menu-item>
                <el-menu-item class="menu-item" index="/faq">常见问题</el-menu-item>
            </el-menu>
            <div class="bg-box">
				<img src="./assets/img/header3.jpg" alt="">
                <span>时光邮局</span>
            </div>
        </div>

        <div class="main">
            <router-view />
        </div>
        <div class="footer">
            <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
        </div>
    </div>
</div>
</template>

<script>
import {
    Menu,
    MenuItem
} from 'element-ui';
export default {
    components: {
        [Menu.name]: Menu,
        [MenuItem.name]: MenuItem
    },
    data() {
        return {
            activeIndex: '/'
        }
    },
    mounted() {
        /* var href = location.href.split('#')[1];
        if (href.indexOf('&') == -1) {
            this.activeIndex = href;
        } else {
            this.activeIndex = href.split('&')[0];
        } */
    },
    watch: {
        $route(to, from) {
            //定位tabItem
            console.log(to);
            this.activeIndex = to.path;
        }
    },
    methods: {
        handleSelect() {

        }
    }
}
</script>

<style lang="scss" scoped>
@import "./styles/responsive.scss";

#app {
    width: 100%;
    height: 100%;
}

.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
        height: auto;
        padding-top: 50px;

        .menu-box {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1001;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            width: 100%;
            height: 50px;

            .menu-item {
                width: 110px;
                text-align: center;
            }
        }

        .bg-box {
            position: relative;
            width: 100%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            span {
                position: absolute;
                top: 16%;
                right: 12%;
                color: #fff;
                font-size: 36px;
                font-weight: 300;
                letter-spacing: 5px;
                text-shadow: 1px 1px 1px #000;
            }

            // &::before{content: ""; display: block; padding-top: 100%;}
        }
    }

    .main {
        flex: 1;
    }

    .footer {
        border-top: 1px solid #DCDFE6;
        padding: 12px 0;
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
    }
}

.el-menu--horizontal>.el-menu-item {
    height: 100%;
    line-height: 56px;
    text-align: center;
}
</style>
