//describe("ie", function () {
//        it("delete不能够正常工作", function () {
//            var foo = {
//                method: "a",
//                func: function () { }
//            };
//            window.t = 1;
//            var m = 2;
//            function del_attribute() {
//                delete foo.method;
//                delete foo.func;
//                delete t;
//            };
//            function del_variable() {
//                delete m;
//            };
           
//            //expect(del_attribute).not.toThrow();
//            //expect(foo.method).toBeUndefined();
//            //expect(foo.method).toBeUndefined();
//            //expect(window.t).toBeUndefined();

//            expect(del_variable).toThrow();
//            expect(window.m).toEqual(2);
//        });
//});


//this.m = 2;

//delete m;

//console.log(m);

//eval('var foo = 1;');

//delete foo;
//m;
//foo;

//console.log(window.foo);