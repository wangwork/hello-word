<!DOCTYPE html>
<html>
<title>风控查询</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="css/main.css" rel="stylesheet" type="text/css" />
<link rel="icon" href="../favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
<body>
<form id="risk" action="risk.php" method="POST" class="bootstrap-frm">
    <h1>风控查询接口</h1>
    <label>
        <span>姓名:</span>
        <input type="text" name="name" value="">
    </label>
    <label>
        <span>身份证件号:</span>
        <input type="text" name="iden" value="">
    </label>
    <label>
        <span>匹配度:</span>
        <input type="text" name="match_baseline" value="">
    </label>
    <div style="text-align:right">
        <span style="color:#e30417;">* 匹配度输入范围0~1</span>
        <input type="submit" class="button" value="提交">
    </div>

</form>
</body>
</html>
