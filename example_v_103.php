<?php
/**
 * Created by PhpStorm.
 * User: Stephen
 * Date: 16/5/10
 * Time: 16:19
 */

function uno_decrypt($data, $key)
{
    $key = md5($key);
    $x = 0;
    $data = base64_decode($data);
    $len = strlen($data);
    $l = strlen($key);
    for ($i = 0; $i < $len; $i++)
    {
        if ($x == $l)
        {
            $x = 0;
        }
        $char .= substr($key, $x, 1);
        $x++;
    }
    for ($i = 0; $i < $len; $i++)
    {
        if (ord(substr($data, $i, 1)) < ord(substr($char, $i, 1)))
        {
            $str .= chr((ord(substr($data, $i, 1)) + 256) - ord(substr($char, $i, 1)));
        }
        else
        {
            $str .= chr(ord(substr($data, $i, 1)) - ord(substr($char, $i, 1)));
        }
    }
    return $str;
}
//通过获取auth参数进行解密获取UID
header("Content-type: text/html; charset=utf-8");
$auth = "F4FMKiyTyzpA6hror+PZpTfwcMVtw32nRdi+ebU1OpZF9hQzE3qy8Oth8z03FYXIZcY/0eKjdCnO+7njU8I0pLFQHyz/EW7AFjxbreLs9+l1KBw30hbByoPIWgktXst3V04JH+Ue1bp9rhpefq4LeooDfHl6hd8BsdNhrr2OsEnu2VDi9EazsFvBCJyMdI4M9ObEsv1a3ZqrHfWjA+QUFgb0M7fZUQoRLgTG89gtcSwo4iqGW2s6G3lY88rWusBLwIxtP+XqsrR0PieBkk9UxtIN+U0rQJw/erSVzd7EDqXILDIfN55ULhyBHfB483b3wxXVcopx4xw=";
$appKey = 'GHy9Q6zn5G';
$appSecret = 'yo7VArHRJdMk9CwiFAKp';
$userInfo = json_decode(uno_decrypt($auth,$appKey.":".$appSecret));
print_r($userInfo);
//得到结果如下：
//array(4) {
//  ["id"] => 用户ID int
//  ["username"] => 用户昵称
//  ["kingmic_account"] => 麦信号
//  ["portrait"] => 头像http地址
//}