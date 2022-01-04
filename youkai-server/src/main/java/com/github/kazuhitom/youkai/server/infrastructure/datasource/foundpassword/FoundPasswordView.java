package com.github.kazuhitom.youkai.server.infrastructure.datasource.foundpassword;

import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

@Entity(immutable = true)
@Table(name = "found_password")
public class FoundPasswordView {
    @Id
    final String password;

    public FoundPasswordView(String password) {
        this.password = password;
    }
}
