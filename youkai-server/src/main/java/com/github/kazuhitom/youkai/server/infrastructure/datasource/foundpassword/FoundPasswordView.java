package com.github.kazuhitom.youkai.server.infrastructure.datasource.foundpassword;

import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPassword;
import org.seasar.doma.Entity;
import org.seasar.doma.Id;
import org.seasar.doma.Table;

@Entity(immutable = true)
@Table(name = "found_password")
public class FoundPasswordView {
    @Id
    private final String password;
    private final long fullCount;

    public FoundPassword toDomain() {
        return new FoundPassword(password);
    }

    public FoundPasswordView(String password, long fullCount) {
        this.password = password;
        this.fullCount = fullCount;
    }
}
