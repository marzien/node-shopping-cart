var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping-cart');

var products =  [
    new Product({
        title: 'Wood Garner Dining Chairs, Set Of 2',
        type: 'furniture',
        url: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/25130_XXX_v1.tif&wid=650&cvt=jpeg',
        quantity: 2,
        price: 181
    }),
    new Product({
        title: 'Mahogany Verona Trestle Table',
        type: 'furniture',
        url: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/331_XXX_v1.tif&wid=650&cvt=jpeg',
        quantity: 2,
        price: 385
    }),
    new Product({
        title: 'Wood Garner Storage Cabinet',
        type: 'furniture',
        url: 'https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/25131_XXX_v1.tif&wid=650&cvt=jpeg',
        quantity: 2,
        price: 349
    }),
    new Product({
        title: 'Snack Pack® Family Pack Vanilla/Chocolate Pudding 12-3.25 Cups',
        type: 'food',
        url: 'https://i5.walmartimages.com/asr/d728bd17-fdfe-4fcd-92f1-5016af8add6a_2.9d22267cdcbe302a7c40c04e25228da2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        quantity: 10,
        price: 2.78
    }),
    new Product({
        title: 'Wonderful® Lightly Salted Pistachios 16 oz. Bag',
        type: 'food',
        url: 'https://i5.walmartimages.com/asr/0c3f172a-2025-4276-ad7f-c0069329592c_1.0790b8233c9846d3d6a0e091e984d9b1.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        quantity: 20,
        price: 6.96
    }),
    new Product({
        title: 'Sam\'s Choice Purified Drinking Water, 10 fl oz, 12 pack',
        type: 'food',
        url: 'https://i5.walmartimages.com/asr/e1385b62-3f21-4db9-a49f-dbdc4b41f2d8_1.6286dc2832411957f72b675585165b79.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        quantity: 2,
        price: 10
    }),
    new Product({
        title: 'Gallop Black Round T-Shirt',
        type: 'clothes',
        url: 'https://n3.sdlcdn.com/imgs/d/f/2/Gallop-Black-Round-T-Shirt-SDL529627832-1-312ee.jpg',
        quantity: 5,
        price: 15
    }),
    new Product({
        title: 'Flying Machine White Round T-Shirt',
        type: 'clothes',
        url: 'https://n2.sdlcdn.com/imgs/f/a/f/Flying-Machine-White-Round-T-SDL249882824-1-89c4e.jpeg',
        quantity: 5,
        price: 15
    }),
    new Product({
        title: 'Flying Machine Blue Straight Jeans',
        type: 'clothes',
        url: 'https://n1.sdlcdn.com/imgs/e/z/i/Flying-Machine-Blue-Straight-Jeans-SDL532588183-1-98b75.jpeg',
        quantity: 2,
        price: 31
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}