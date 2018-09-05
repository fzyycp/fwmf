#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * Copyright (c)
 */

package ${package}.web.global.common;

import cn.faury.fdk.common.entry.RestResultCode;
import cn.faury.fdk.common.exception.TipsException;
import cn.faury.fdk.common.utils.StringUtil;
import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import java.io.*;

/**
 */
public class UploadFileUtil {

    /**
     * 从Action中保存文件到指定位置
     *
     * @param path 目标文件路径(以"/"开头,结尾不包含"/",不支持"../"或者"./"格式访问路径)
     * @param is   输入流
     */
    public static boolean saveFileFromAction(String path, InputStream is) {
        if (StringUtil.isEmpty(path) || is == null) {
            return false;
        }
        // 安全处理
        path = path.replace("../", "/");
        String realPath = ServletActionContext.getServletContext().getRealPath(GlobalConst.UPLOAD_ROOT + path);
        File saveFile = new File(realPath);
        // 如果目录不存在则创建
        if (!saveFile.getParentFile().exists()) {
            saveFile.getParentFile().mkdirs();
        }
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(saveFile);
            byte[] b = new byte[1024];
            while (is.read(b, 0, b.length) != -1) {
                fos.write(b, 0, b.length);
            }
            fos.flush();
            return true;
        } catch (IOException e) {
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return false;
    }

    /**
     * 从Action中保存文件到指定位置
     *
     * @param path 目标文件路径(以"/"开头,结尾不包含"/",不支持"../"或者"./"格式访问路径)
     * @param file 文件对象
     */
    public static boolean saveFileFromAction(String path, File file) {
        if (StringUtil.isEmpty(path) || file == null) {
            return false;
        }
        // 安全处理
        path = path.replace("../", "/");
        String realPath = ServletActionContext.getServletContext().getRealPath(GlobalConst.UPLOAD_ROOT + path);
        File saveFile = new File(realPath);
        // 如果目录不存在则创建
        if (!saveFile.getParentFile().exists()) {
            saveFile.getParentFile().mkdirs();
        }
        try {
            // 复制文件
            FileUtils.copyFile(file, saveFile);
            return true;
        } catch (IOException e) {
        }
        return false;
    }

    public static boolean appendFileFromAction(String path, File file) {
        if (StringUtil.isEmpty(path) || file == null) {
            return false;
        }
        // 安全处理
        path = path.replace("../", "/");
        String realPath = ServletActionContext.getServletContext().getRealPath(GlobalConst.UPLOAD_ROOT + path);
        File saveFile = new File(realPath);
        // 如果目录不存在则创建
        if (!saveFile.getParentFile().exists()) {
            saveFile.getParentFile().mkdirs();
        }
        BufferedInputStream fileReader = null;
        try {
            int len;
            byte[] buf = new byte[1024];
            fileReader = new BufferedInputStream(new FileInputStream(file));
            while ((len = fileReader.read(buf)) != -1) {
                FileUtils.writeByteArrayToFile(saveFile, buf, 0, len, true);
            }
            return true;
        } catch (Exception e) {
            throw new TipsException(RestResultCode.CODE500, e);
        } finally {
            if (fileReader != null) {
                try {
                    fileReader.close();
                } catch (IOException e) {
                }
            }
        }
    }

    public static boolean deleteFileFromAction(String path) {
        if (StringUtil.isNotEmpty(path)) {
            // 安全处理
            path = path.replace("../", "/");
            String realPath = ServletActionContext.getServletContext().getRealPath(GlobalConst.UPLOAD_ROOT + path);
            File saveFile = new File(realPath);
            if (saveFile.exists()) {
                return saveFile.delete();
            }
        }
        return false;
    }

    public static boolean copyFileFromAction(String srcPath, String descPath) {
        if (StringUtil.isNotEmpty(srcPath, descPath)) {
            // 安全处理
            srcPath = srcPath.replace("../", "/");
            descPath = descPath.replace("../", "/");
            String realSrcPath = ServletActionContext.getServletContext().getRealPath(GlobalConst.UPLOAD_ROOT + srcPath);
            String realDescPath = ServletActionContext.getServletContext().getRealPath(GlobalConst.UPLOAD_ROOT + descPath);
            File srcFile = new File(realSrcPath);
            File descFile = new File(realDescPath);
            if (srcFile.exists()) {
                try {
                    FileUtils.copyFile(srcFile, descFile);
                    return true;
                } catch (IOException e) {
                    return false;
                }
            }
        }
        return false;
    }
}
