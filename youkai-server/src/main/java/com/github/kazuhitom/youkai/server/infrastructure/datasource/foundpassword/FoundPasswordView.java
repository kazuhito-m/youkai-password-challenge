package com.github.kazuhitom.youkai.server.infrastructure.datasource.foundpassword;

import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

@Entity(immutable = true)
@Table(name = "found_password")
public class FoundPasswordView {
    @Id
    final String password;
    final int full_count;

    public FoundPasswordView(String password, int full_count) {
        this.password = password;
        this.full_count = full_count;
    }
}
