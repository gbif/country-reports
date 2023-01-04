# Making corrections

We have occasionally published sets of reports with errors, often affecting only a small number of
reports.  If the cached HTTP requests are no longer available then correcting them is complicated
— much of the data is live as of the day the report is generated (ideally as soon to 1 January as
possible). It can be easier to edit the existing PDFs.

Tools that can be used for manual correction:

## Images/charts

The process is to overlay a new image exactly on top of the existing image.

Use [PDFBox](https://pdfbox.apache.org/).  The GUI debugger `java -jar pdfbox-app-2.y.z.jar
PDFDebugger` can be used to inspect the PDF and find the identifier for the problem image.
[PrintImageLocations.java](https://svn.apache.org/viewvc/pdfbox/trunk/examples/src/main/java/org/apache/pdfbox/examples/util/PrintImageLocations.java?view=markup)
can be modified to find only this image, which may be replaced based on
[AddImageToPDF.java](https://svn.apache.org/viewvc/pdfbox/trunk/examples/src/main/java/org/apache/pdfbox/examples/pdmodel/AddImageToPDF.java?view=markup).

## Text

Editing text in a PDF is tricky.

One way is to uncompress the PDF `pdftk file.pdf output uncompressed_file.pdf uncompress` and then
find the appropriate block, perhaps using PDFDebugger and knowledge of the font size (see
https://askubuntu.com/a/1104538) such as `F4 15 Tf` or the position e.g. `501.231`.  A hex editor
can change the text (hopefully you can find the required characters), and the file should then be
recompressed.
