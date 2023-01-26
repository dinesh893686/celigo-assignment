const router =require('express').Router();

router.get('/:product-file-name',(req, res) => {
    const productFile = req.params.product - file - name;
    fs.readFile(`./products/${productFile}.json`, (err, content) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(content);
        }
    });
})

module.exports=router;