const testFunc = async function(data) {
  
    console.log("Test Function Init .... #:" + data);

};

export default ({ store }) => {
    store["$msg"] = {
        testFunc: testFunc.bind(store)
    };
};
  