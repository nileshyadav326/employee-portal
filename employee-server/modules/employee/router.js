import express from 'express';
import { uploadFile } from '../../utils/uploadConfig';
import employeetbl from './employeetbl';

const router = express.Router({ caseSensitive: true });

router.post('/addEmployee', employeetbl.addEmployee);
router.post('/updateEmployee', employeetbl.updateEmployee);
router.delete('/deleteEmployee', employeetbl.deleteEmployee);
router.get('/listEmployee', employeetbl.listEmployee);
router.post('/uploadFile', uploadFile.single('uploaded_file'),  async(req, res) => {
    try {
        res.status(200).json({
          status: "success",
          data : req.file,
          message: "File created successfully!!",
        });
      } catch (error) {
        res.json({
          error,
        });
      }
});

module.exports = router;
