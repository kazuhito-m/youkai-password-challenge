package com.github.kazuhitom.youkai.server.infrastructure.datasource.foundpassword;

import org.seasar.doma.Dao;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;

@Dao
@ConfigAutowireable
public interface FoundPasswordDao {
    @Select
    List<FoundPasswordView> selectOf(String part);
}
