<template>
  <form-wizard @on-complete="onComplete" shape="tab" color="#9b59b6">
    <div slot="title">Chuyển khoản nội bộ</div>
    <tab-content title="Step 1" :before-change="beforeTabSwitch">
      <b-alert show variant="primary">Chọn tài khoản nguồn: {{ selected }}</b-alert>
      <div>
        <b-form-select v-model="selected" :options="options" :select-size="8"></b-form-select>
      </div>
    </tab-content>
    <tab-content title="Step 2">
      <b-alert show variant="primary">
        Chọn người nhận: {{ selected }}
        <sup>
          <br />
          <font size="2" color="red">
            <i>*Nhấn next nếu người nhận không có trong danh sách</i>
          </font>
        </sup>
      </b-alert>
      <div>
        <b-form-select v-model="selected" :options="options" :select-size="8"></b-form-select>
      </div>
    </tab-content>
    <tab-content title="Step 3">
      <b-alert show variant="primary">
        Điền STK người nhận: {{ selected }}
        <sup>
          <br />
          <font size="2" color="red">
            <i>*Nhấn next nếu đã chọn người nhận ở bước 2</i>
          </font>
        </sup>
      </b-alert>
      <b-form-input v-model="selected" type="number" placeholder="Nhập vào số tài khoản người nhận"></b-form-input>
      <b-card border-variant="info" header="Thông tin người nhận" align="center">
        <b-card-text>
          <p>Số tài khoản: {{selected}}</p>
          <p>Tên tài khoản: {{selected}}</p>
        </b-card-text>
      </b-card>
    </tab-content>
    <tab-content title="Step 4">
      <b-alert show variant="primary">Số tiền chuyển khoản: {{ selected }}</b-alert>
      <b-form-input v-model="selected" type="range" min="500000" max="5000000" step="500000"></b-form-input>
    </tab-content>
    <tab-content title="Step 5">
      <b-alert show variant="primary">Nội dung chuyển khoản:</b-alert>
      <b-form-textarea
        id="textarea-large"
        rows="5"
        size="lg"
        placeholder="Nhập nội dung chuyển khoản"
      ></b-form-textarea>
    </tab-content>
    <tab-content title="Step 6">
      <b-alert show variant="primary">Chọn hình thức thanh toán phí</b-alert>
      <b-form-radio-group v-model="selected" :options="radioOptions" stacked name="radio-inline"></b-form-radio-group>
    </tab-content>
    <tab-content title="Step 7">
      <b-alert show variant="primary">Preview</b-alert>
      <b-card border-variant="info" header="Thông tin chuyển khoản" align="left">
        <p>Tài khoản nguồn: {{selected}}</p>
        <p>Tài khoản nhận: {{selected}}</p>bla bla
      </b-card>
    </tab-content>
    <tab-content title="Finish">
      <b-alert show variant="primary">Xác thực OTP</b-alert>
      <b-form-input id="input-large" size="lg" placeholder="Nhập mã OTP đã gửi qua email"></b-form-input>
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
export default {
  data() {
    return {
      radioOptions: [
        { value: 0, text: "Người chuyển trả" },
        { value: 1, text: "Người nhận trả" }
      ],
      selected: null,
      options: [
        { value: null, text: "Please select some item" },
        {
          text: "Tran Van A - 02810002324343",
          value: "02810002324343"
        },
        {
          text: "Tran Van A1 - 02810002324343",
          value: "aa02810002324343"
        },
        {
          text: "Tran Van A2 - 02810002324343",
          value: "aaaaa02810002324343"
        }
      ]
    };
  },
  components: {
    FormWizard,
    TabContent
  },
  computed:{
    srcAccount: {
      get() {
        return this.$store.getters.srcAccount;
      },
      set(srcAccount) {
        this.$store.dispatch("srcAccount", srcAccount);
      }
    },
    lstSrc: {
      get() {
        return this.$store.getters.lstSrc;
      },
      set(lstSrc) {
        this.$store.dispatch("lstSrc", lstSrc);
      }
    },
    receiveAccount: {
      get() {
        return this.$store.getters.receiveAccount;
      },
      set(receiveAccount) {
        this.$store.dispatch("receiveAccount", receiveAccount);
      }
    },
    lstReceive: {
      get() {
        return this.$store.getters.lstReceive;
      },
      set(lstReceive) {
        this.$store.dispatch("lstReceive", lstReceive);
      }
    },
    soTienChuyen: {
      get() {
        return this.$store.getters.soTienChuyen;
      },
      set(soTienChuyen) {
        this.$store.dispatch("soTienChuyen", soTienChuyen);
      }
    },
    messageTransfer: {
      get() {
        return this.$store.getters.messageTransfer;
      },
      set(messageTransfer) {
        this.$store.dispatch("messageTransfer", messageTransfer);
      }
    },
    nguoitraphi: {
      get() {
        return this.$store.getters.nguoitraphi;
      },
      set(nguoitraphi) {
        this.$store.dispatch("nguoitraphi", nguoitraphi);
      }
    }
  },
  methods: {
    onComplete: function() {
      alert("Yay. Done!");
    },
    beforeTabSwitch: function() {
      alert("This is called before switching tabs");
      return true;
    }
  }
};
</script>