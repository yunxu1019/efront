private JButton getJButtonLogin() {
        if (jButton_Login == null) {
            jButton_Login = new JButton();
            jButton_Login.setBounds(715, 20, 60, 30);
            jButton_Login.setText("登陆");
            jButton_Login.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent event) {
                    try {
                        // 第一步获取login_sig
                        HttpGet httpGet = new HttpGet("http://ui.ptlogin2.qq.com/cgi-bin/login?daid=5&pt_qzone_sig=1&hide_title_bar=1&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=549000912&style=12&target=self&s_url=http%3A//qzs.qq.com/qzone/v5/loginsucc.html?para=izone&pt_qr_app=%CA%D6%BB%FAQQ%BF%D5%BC%E4&pt_qr_link=http%3A//z.qzone.com/download.html&self_regurl=http%3A//qzs.qq.com/qzone/v6/reg/index.html&pt_qr_help_link=http%3A//z.qzone.com/download.html");
                        appendJTextArea("Http Request：" + httpGet.getURI());                        
                        String responseBody = new String(HttpUtils.request(httpGet));
                        appendJTextArea("Http Response: " + responseBody);
                        PTUI ptui = JSON.parseObject(StringUtils.findPattern("pt.ptui\\=\\{(.+)}", responseBody).replace("pt.ptui=", "").replace("encodeURIComponent(", "").replace(")", ""), PTUI.class);
                        if(ptui == null) {
                            JOptionPane.showMessageDialog(null, "请求登陆签名失败");
                            return;
                        }
                        // 第二步获取验证码
                        String verifyCode = null;
                        String uin = null;
                        if (jCheckBox.isSelected()) {
                            if (jTextField_VerifyCode.getText().equals("")) {
                                JOptionPane.showMessageDialog(null, "请输入验证码");
                                jTextField_VerifyCode.requestFocusInWindow();
                                return;
                            }
                            if (jTextField_VerifyCode.getText().length() > 4) {
                                JOptionPane.showMessageDialog(null, "非法验证码");
                                jTextField_VerifyCode.requestFocusInWindow();
                                return;
                            }
                            verifyCode = jTextField_VerifyCode.getText().trim();
                        } else {
                            httpGet = new HttpGet("http://check.ptlogin2.qq.com/check?regmaster=&uin=" + jTextField_UID.getText() + "&appid=549000912&js_ver=10052&js_type=1&login_sig=" + ptui.getLogin_sig() + "&u1=http%3A%2F%2Fqzs.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone&r=" + Math.random());
                            appendJTextArea("Http Request：" + httpGet.getURI());
                            responseBody = new String(HttpUtils.request(httpGet));
                            appendJTextArea("Http Response: " + responseBody);
                            String[] params = StringUtils.findPattern(QQUtils.FUNCTION_PATTERN, responseBody).replace("'", "").split(",");
                            if (params == null || !params[0].equals("0")) {
                                refreshVerifyCode();
                                JOptionPane.showMessageDialog(null, "请求自动验证失败");
                                jButton_Login.requestFocusInWindow();
                                return;
                            }
                            uin = params[2];
                            verifyCode = params[1];
                        }
                        // 第三步登陆空间
                        httpGet = new HttpGet("http://ptlogin2.qq.com/login?u=" + jTextField_UID.getText() + "&p=" + QQUtils.getPwd(uin == null ? MD5Utils.uin2hex(jTextField_UID.getText()) : uin, new String(jTextField_PWD.getPassword()).trim(), verifyCode) + "&verifycode=" + verifyCode + "&aid=549000912&u1=http%3A%2F%2Fqzs.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone&h=1&ptredirect=0&ptlang=2052&daid=5&from_ui=1&dumy=&low_login_enable=0&regmaster=&fp=loginerroralert&action=2-21-1385452444158&mibao_css=&t=1&g=1&js_ver=10052&js_type=1&login_sig=" + ptui.getLogin_sig() + "&pt_rsa=0&pt_qzone_sig=1");
                        appendJTextArea("Http Request：" + httpGet.getURI());
                        responseBody = new String(HttpUtils.request(httpGet));
                        appendJTextArea("Http Response: " + responseBody);
                        String[] params = StringUtils.findPattern(QQUtils.FUNCTION_PATTERN, responseBody).replace("'", "").split(",");
                        if (params == null || !params[0].equals("0")) {
                            JOptionPane.showMessageDialog(null, "请求登陆失败" + params != null ? ":" + params[4] : "");
                            jButton_Login.requestFocusInWindow();
                            return;
                        }
                        JOptionPane.showMessageDialog(null, params[5] + ", " + params[4]);
                    } catch (Exception e) {
                        appendJTextArea(e.getMessage());
                    }
                }
            });
        }
        return jButton_Login;
    }