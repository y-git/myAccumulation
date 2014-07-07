(function () {
    namespace("YE").Bitmap = YYC.Class(YE.Entity, {
        Init: function (img) {
            this.base();

            this.img = img;
            this.width = this.img.width;
            this.height = this.img.height;
        },
        Private: {
            ye_flipX: false,
            ye_flipY: false
        },
        Public: {
            img: null,
            width: 0,
            height: 0,
            pixelOffsetX: 0,
            pixelOffsetY: 0,

            setFlipX: function () {
                this.ye_flipX = true;

                return this;
            },
            setFlipY: function () {
                this.ye_flipY = true;

                return this;
            },
            isFlipX: function () {
                return this.ye_flipX;
            },
            isFlipY: function () {
                return this.ye_flipY;
            },
            setAnchor: function (pixelOffsetX, pixelOffsetY) {
                this.pixelOffsetX = pixelOffsetX;
                this.pixelOffsetY = pixelOffsetY;

                return this;
            },
            copy: function () {
                var bitmap = YE.Bitmap.create(this.img);

                YE.Tool.extend.extend(bitmap, this);

                return bitmap;
            }
        },
        Static: {
            create: function (img) {
                return new YE.Bitmap(img);
            }
        }
    });
}());

