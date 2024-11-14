const modelOptions = {
    toJSON: {
      virtuals: true,
      transform: (_, obj) => {
        delete obj._id;
        return obj;
      }
    },
    toObject: {
      virtuals: true,
      transform: (_, obj) => {
        delete obj._id;
        return obj;
      }
    },
    versionKey: false,
    timestamps: true
  };
  
  export default modelOptions;

  /*modelOptions là một đối tượng chứa các cấu hình
   giúp kiểm soát cách dữ liệu từ các mô hình sẽ được
    chuyển đổi thành JSON hoặc đối tượng JavaScript khi được trả về trong ứng dụng.
  */