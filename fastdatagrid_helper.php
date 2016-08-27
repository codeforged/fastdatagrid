<?php
  function sqlAdapter($dbx, $sqlstr, $params=[], $customdata=[]) {
    $rowperpage=$_POST["rowperpage"];
    $pageno=$_POST["pageno"];

    $affectedrows = 0;
    $datewhere="";

    $totalrowcount_sqlstr = "select count(*) as counter from (".$sqlstr.") as x";
    $totalrowcount_query = $dbx->query($totalrowcount_sqlstr, $params);     
    $totalrowcount_query_rows = $totalrowcount_query->result();
    $totalrowcount = $totalrowcount_query_rows[0]->counter;

    $sqlstr .= " limit ".($pageno*$rowperpage).",".$rowperpage;
    $query = $dbx->query($sqlstr, $params);     

    $data = [];
    $data["customdata"] = $customdata;
    $data["rows"] = $query->result();
    $data["totalrowcount"] = $totalrowcount;

    echo json_encode($data);
  }
