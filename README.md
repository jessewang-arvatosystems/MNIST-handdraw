# MNIST-handdraw
Hand draw a MNIST style image from a web browser and download the result.

[Demo Page](https://jessewang-arvatosystems.github.io/MNIST-handdraw/index.html)

## To Use
Simply draw on the canvas by left-clicking on it with a mouse.

To start over, click on the Reset button.

Click on Download button to download the image. The image will be a 28x28 grayscale png.
The downloaded image will have the filename specified in the input field. Defaults to "0.png".

### Additional Options
1. Invert Black & White: Toggles the canvas to swap to a white background and black foreground. Also resets the current canvas.
2. Stroke Width: Adjust size of pen, minimum is 10px and maximum is 30px. Defaults to 20px.
3. Increment filename by 1: Assumes the filename is in a numerical format, otherwise this will result in a NaN. After the Download button is clicked, increments the filename by 1. Enabled by default.
4. Reset canvas: Resets canvas after the Download button is clicked. Enabled by default.

## Notes
The goal of this project is to easily create a hand drawn images to test your personal MNIST trained model.
Other MNIST drawing applications either require you run the code locally or are used to test their own MNIST models.

Realistically the canvas size should be 28x28, but it is pretty hard to see or draw on, so I created a 280x280 canvas instead.
Experiments using larger canvas sizes creates worse results as the final image is scaled down to a 28x28 PNG.

HTML5 Canvas does not output PNGs to grayscale form. Instead, it outputs to an RGBA PNG that I then convert to Grayscale using the image-js library.

## Libraries
The conversion of the image from RGBA to Grayscale is handled by:
[image-js](https://github.com/image-js/image-js/)

## License
Copyright (c) 2022 Jesse Wang [(jesse.wang@arvatosystems.com)](mailto:jesse.wang@arvatosystems.com)

MIT License
